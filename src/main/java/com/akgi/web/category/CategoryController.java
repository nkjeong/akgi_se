package com.akgi.web.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryEntity> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{code}")
    public Optional<CategoryEntity> getCategoryByCode(@PathVariable String code) {
        return categoryService.getCategoryByCode(code);
    }

    @PostMapping
    public CategoryEntity createCategory(@RequestBody CategoryEntity category) {
        return categoryService.saveCategory(category);
    }

    @PutMapping("/{code}")
    public CategoryEntity updateCategory(@PathVariable String code, @RequestBody CategoryEntity category) {
        category.setCode(code);
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/{code}")
    public void deleteCategory(@PathVariable String code) {
        categoryService.deleteCategory(code);
    }
}