package com.akgi.web.categoryone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoryone")
public class CategoryOneController {

    @Autowired
    private CategoryOneService categoryOneService;

    @GetMapping
    public List<CategoryOne> getAllCategories() {
        return categoryOneService.getAllCategories();
    }

    @GetMapping("/{code}")
    public List<CategoryOne> getCategoriesByCode(@PathVariable String code) {
        return categoryOneService.getCategoriesByCode(code);
    }

    @GetMapping("/category/{categoryCode}")
    public List<CategoryOne> getCategoriesByCategoryCode(@PathVariable String categoryCode) {
        return categoryOneService.getCategoriesByCategoryCode(categoryCode);
    }

    @PostMapping
    public CategoryOne saveCategory(@RequestBody CategoryOne category) {
        return categoryOneService.saveCategory(category);
    }

    @DeleteMapping("/{code}/{categoryCode}")
    public void deleteCategory(@PathVariable String code, @PathVariable String categoryCode) {
        categoryOneService.deleteCategory(code, categoryCode);
    }
}