package com.akgi.web.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);

    @Query("SELECT COALESCE(MAX(CAST(u.id AS int)), 0) FROM User u")
    int findMaxIdx();
}
