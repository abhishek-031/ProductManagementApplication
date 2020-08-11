package com.gunjan.product.controller;

import java.util.List;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.gunjan.product.model.Product;
import com.gunjan.product.service.ProductHardcodedService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ProductController {

	@Autowired
	private ProductHardcodedService productService;

	// adding a product
	@PostMapping("/users/{userType}/productList/createProduct")
	public ResponseEntity<Void> createProduct(@PathVariable String userType, @RequestBody Product product) {

		Product createdProduct = productService.save(product);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(createdProduct.getProductId()).toUri();

		return ResponseEntity.created(uri).build();
	}

	@GetMapping("/users/{userType}/productList/fetch")
	public List<Product> getAllProducts(@PathVariable String userType) {
		return productService.findAll();
	}

	@GetMapping("/users/{userType}/productList/costlyProducts/{price}")
	public List<Product> getAllProductsBasedOnPrice(@PathVariable String userType, @PathVariable double price) {

		return productService.priceGreaterThenMentioned(price);
	}

	@GetMapping("/users/{userType}/productList/notAvailable")
	public List<Product> getAllProductsNotAvailabile(@PathVariable String userType) {

		return productService.filterBasedOnAvailability();
	}

	@GetMapping("/users/{userType}/productList/searchByCategory/{listOfCategory}")
	public List<Product> getAllProductsBasedOnCategory(@PathVariable String userType,
			@PathVariable String listOfCategory) {
        String[] categories = listOfCategory.split(",");
        System.out.println("hi");
		return productService.productsIntersection(categories);
	}

	// Edit/Update a product
	@PutMapping("/users/{userType}/productList/updateProduct/{productId}")
	public ResponseEntity<Product> updateProduct(@PathVariable String userType, @PathVariable long productId,
			@RequestBody Product product) {

		Product productUpdated = productService.save(product);

		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}

	// DELETE /users/{userType}/productList/deleteProduct/{productId}
	@DeleteMapping("/users/{userType}/productList/deleteProduct/{productId}")
	public ResponseEntity<Void> deleteProduct(@PathVariable String userType, @PathVariable long productId) {

		Product product = productService.deleteById(productId);

		if (product != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

}
