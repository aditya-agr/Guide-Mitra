package net.java.GuideMitra.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    @Column(name = "Name")
    private String name;

    @Column(name = "UserName", nullable = false, unique = true)
    private String username;
    
    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "Language", nullable = false)
    private String languagePreference;

    @Column(name = "Country")
    private String country;
}
