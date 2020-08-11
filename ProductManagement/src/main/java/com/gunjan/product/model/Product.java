package com.gunjan.product.model;
import java.util.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//@Entity
public class Product implements Comparable<Product> {

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long productId;
	private String name;
	private HashSet<String> category;
	private double price;
    private boolean availability;
	private int quantity;
	public Product()
	{
		
	}
	public Product(long id, String name, HashSet<String> category, double price, boolean availability, int quantity) {
		super();
		this.productId = id;
		this.name = name;
		this.category = category;
		this.price = price;
		this.availability = availability;
		this.quantity = quantity;
	}
	public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public HashSet<String> getCategory() {
		return category;
	}
	public void setCategory(HashSet<String> category) {
		this.category = category;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public boolean isAvailability() {
		return availability;
	}
	public void setAvailability(boolean availability) {
		this.availability = availability;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	@Override
	public int compareTo(Product o) {
		
			  if(this.getPrice() - o.getPrice() < 0)
				  return -1;
			  else if(this.getPrice() - o.getPrice() > 0)
				  return 1;
			  else
				  return 0;
	}
	
}
