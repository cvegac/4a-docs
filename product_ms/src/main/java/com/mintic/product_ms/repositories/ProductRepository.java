package com.mintic.product_ms.repositories;

import com.mintic.product_ms.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByType (String type);
    List<Product> findByName (String name);
}
