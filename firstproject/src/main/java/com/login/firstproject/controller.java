package com.login.firstproject;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

import java.util.List;

//import com.login.firstproject.Employeeservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/users")
public class controller {

    @Autowired
    private Employeeservice firebaseService;


    @PostMapping("/create")
    public UserRecord createUser(@RequestBody user createUserRequest) 
    { try { String email = createUserRequest.getEmail();
         String password = createUserRequest.getPassword(); 
         String id = createUserRequest.getid(); 
         String name=createUserRequest.getname();
         if (!isValidEmail(email)) { throw new IllegalArgumentException("Invalid email format: " + email); }
          return firebaseService.createUser(name,email, password, id); } 
          catch (FirebaseAuthException e) { e.printStackTrace(); return null; } }
           private boolean isValidEmail(String email) { String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$"; return email.matches(emailRegex);
    }
    @GetMapping("/{uid}")
    public UserRecord getUser(@PathVariable String uid) {
        try {
            return firebaseService.getUserById(uid);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }
    @GetMapping("/get")
    public List<user> getall() {
        try {
            return firebaseService.listAllUsers();
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }
    @PutMapping("/update/{id}")
    public UserRecord updateuser(@PathVariable String id,@RequestBody user u) {
        try {
            String email = u.getEmail();
         String password = u.getPassword();
         String name = u.getname();
         if (!isValidEmail(email)) { throw new IllegalArgumentException("Invalid email format: " + email); }
            return firebaseService.updateUserById(id,name, email, password);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @DeleteMapping("/delete/{uid}")
    public String deleteUser(@PathVariable String uid) {
        try {
            firebaseService.deleteUser(uid);
            return "User deleted successfully";
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return "Error deleting user";
        }
    }
}
