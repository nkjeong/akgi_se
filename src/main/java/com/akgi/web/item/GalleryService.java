package com.akgi.web.item;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.criteria.Predicate;

@Service
public class GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    public Optional<Gallery> getGalleryByCode(String code) {
        return galleryRepository.findByCode(code);
    }

    public List<Gallery> getGalleriesByCategoryCodePrefix(String prefix) {
        return galleryRepository.findByCategoryCodeStartingWith(prefix);
    }

    public List<Gallery> getGalleriesByNameContaining(String partName) {
        return galleryRepository.findByNameContaining(partName);
    }
    
    public long countAllGalleries() {
        return galleryRepository.count();
    }

    public List<Gallery> getGalleriesByNameWithAndSearch(String partName) {
        String[] keywords = partName.split(" "); // 공백으로 문자열 분리
    
        Specification<Gallery> spec = (root, query, cb) -> {
            Predicate finalPredicate = cb.conjunction();
            for (String keyword : keywords) {
                Predicate predicate = cb.like(root.get("name"), "%" + keyword + "%");
                finalPredicate = cb.and(finalPredicate, predicate);
            }
            return finalPredicate;
        };
    
        return galleryRepository.findAll(spec);
    }
    
    public List<Gallery> getGalleriesByExactCategoryCode(String categoryCode) {
        return galleryRepository.findByCategoryCode(categoryCode);
    }
}
