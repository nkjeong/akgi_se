package com.akgi.web.option;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface OptionRepository extends JpaRepository<Option, String> {
    Optional<Option> findByCode(String code);
}