package com.akgi.web.categoryone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryOneService {

    @Autowired
    private CategoryOneRepository categoryOneRepository;

    // 특정 code에 해당하는 CategoryOne 목록 조회
    public List<CategoryOne> getCategoriesByCode(String code) {
        return categoryOneRepository.findByCode(code);
    }

    // 특정 categoryCode에 해당하는 CategoryOne 목록 조회
    public List<CategoryOne> getCategoriesByCategoryCode(String categoryCode) {
        return categoryOneRepository.findByCategoryCode(categoryCode);
    }

    // 모든 CategoryOne 목록 조회
    public List<CategoryOne> getAllCategories() {
        return categoryOneRepository.findAll();
    }

    // CategoryOne 추가
    public CategoryOne saveCategory(CategoryOne categoryOne) {
        return categoryOneRepository.save(categoryOne);
    }

    // CategoryOne 수정
    public CategoryOne updateCategoryOne(CategoryOne categoryOne) {
        if (categoryOneRepository.existsById(categoryOne.getId())) {
            return categoryOneRepository.save(categoryOne);
        }
        return null;
    }

    // CategoryOne 삭제
    public void deleteCategoryOne(CategoryOneId id) {
        categoryOneRepository.deleteById(id);
    }
    
    public void deleteCategory(String code, String categoryCode) {
        CategoryOneId id = new CategoryOneId(code, categoryCode);
        categoryOneRepository.deleteById(id);
    }

    // 특정 ID를 가진 CategoryOne 조회
    public Optional<CategoryOne> getCategoryById(CategoryOneId id) {
        return categoryOneRepository.findById(id);
    }
}
