package com.akgi.web.item;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, String>, JpaSpecificationExecutor<Gallery> {

    List<Gallery> findAll();

    Optional<Gallery> findByCode(String code);

    List<Gallery> findByCategoryCodeStartingWith(String prefix);

    List<Gallery> findByNameContaining(String partName);
    
    List<Gallery> findByCategoryCode(String categoryCode);
}