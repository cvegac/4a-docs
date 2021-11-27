package com.mintic.product_ms.models;

import org.springframework.data.annotation.Id;

public class Product {
    @Id
    private String id;
    private String name;
    private String type;
    private String description;
    private Integer price;

    public Product(String id, String name, String type, String description, Integer price) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
