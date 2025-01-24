package com.akgi.web.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserId(String userId);

    @Query("SELECT COALESCE(MAX(CAST(u.id AS int)), 0) FROM User u")
    int findMaxIdx();

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.authority = :authority WHERE u.userId = :userId")
    void updateAuthorityByUserId(@Param("userId") String userId, @Param("authority") String authority);
}