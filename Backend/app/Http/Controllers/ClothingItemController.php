<?php

namespace App\Http\Controllers;

use App\Models\ClothingItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClothingItemController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = ClothingItem::query()->where('user_id', Auth::id());

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        return response()->json([
            'data' => $query->with('category')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'size' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'brand' => 'nullable|string|max:100',
            'image_url' => 'nullable|url',
            'category_id' => 'required|exists:categories,id',
        ]);

        $clothingItem = Auth::user()->clothingItems()->create($validated);

        return response()->json([
            'message' => 'Clothing item created successfully',
            'data' => $clothingItem
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClothingItem  $clothingItem
     * @return \Illuminate\Http\Response
     */
    public function show(ClothingItem $clothingItem)
    {
        $this->authorize('view', $clothingItem);
        
        return response()->json([
            'data' => $clothingItem->load('category')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ClothingItem  $clothingItem
     * @return \Illuminate\Http\Response
     */
    public function edit(ClothingItem $clothingItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClothingItem  $clothingItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClothingItem $clothingItem)
    {
        $this->authorize('update', $clothingItem);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'size' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'brand' => 'nullable|string|max:100',
            'image_url' => 'nullable|url',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        $clothingItem->update($validated);

        return response()->json([
            'message' => 'Clothing item updated successfully',
            'data' => $clothingItem
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClothingItem  $clothingItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClothingItem $clothingItem)
    {
        $this->authorize('delete', $clothingItem);

        $clothingItem->delete();

        return response()->json([
            'message' => 'Clothing item deleted successfully'
        ]);
    }
}
