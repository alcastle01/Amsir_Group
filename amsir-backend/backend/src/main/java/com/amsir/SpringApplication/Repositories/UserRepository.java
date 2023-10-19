package com.amsir.SpringApplication.Repositories;

import com.amsir.SpringApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select u from User u where u.id=:id")
    User getByIntegerId(@Param("id") Integer id);
    @Query("select u from User u where u.username=:username")
    User getByUsername(@Param("username") String username);

    @Query("select u from User u where u.email=:email")
    User getByEmail(@Param("email") String email);

    @Modifying
    @Query("delete from User u where u.id=:id")
    void deleteUserById(@Param("id") Integer id);
}
