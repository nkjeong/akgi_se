package com.akgi.web.categoryone;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryOneRepository extends JpaRepository<CategoryOne, CategoryOneId> {

    List<CategoryOne> findByCode(String code);

    List<CategoryOne> findByCategoryCode(String categoryCode);
}
