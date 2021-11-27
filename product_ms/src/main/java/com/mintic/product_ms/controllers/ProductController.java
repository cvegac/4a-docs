package com.mintic.product_ms.controllers;

import com.mintic.product_ms.exceptions.InsufficientQuantityException;
import com.mintic.product_ms.exceptions.ProductNotFoundException;
import com.mintic.product_ms.models.Product;
import com.mintic.product_ms.repositories.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @GetMapping("/products")
    List<Product> getProducts(){
        return productRepository.findAll();
    }

    @GetMapping("/products/{type}")
    List<Product> getProductsType(@PathVariable String type){
        return productRepository.findByType(type);
    }

    /*
    @PostMapping("/product/{quantity}")
    List<Product> newProduct(@PathVariable Integer quantity, @RequestBody Product product){
        List<Product> products = new ArrayList<>();
        for (int i=0; i<quantity; i++){
            products.add(product);
            productRepository.save(product);
        }
        return products;
    }*/

    @PostMapping("/product")
    Product newProduct( @RequestBody Product product) {
        return productRepository.save(product);
    }


    @PutMapping("/product/{buy}")
    List<Product> updateProduct(@PathVariable Integer buy, @RequestBody Product product){
        productRepository.findById(product.getId())
                .orElseThrow(() -> new ProductNotFoundException("No se encontro el producto"));
        List<Product> products = productRepository.findByName(product.getName());

        if (products.size() < buy)
            throw new InsufficientQuantityException("Cantidad superior al Stock");

        for (int i=0; i<buy; i++){
            productRepository.delete(products.get(i));
        }

        return productRepository.findByName(product.getName());
    }

    @GetMapping("/product/{id}")
    Product getProduct(@PathVariable String id){
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("No se encontro el producto"));
    }
}
