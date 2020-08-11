package com.gunjan.product.service;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gunjan.product.model.Product;

@Service
public class ProductHardcodedService {

	 private static List<Product> productList = new ArrayList<>();
	 private static long idCounter = 0;
	 
	 static {
		 HashSet<String> category1 = new HashSet<>();
		 category1.add("Furniture");
		 productList.add(new Product(++idCounter, "Chair", category1, 2000.0, false, 0));
		 HashSet<String> category2 = new HashSet<>();
		 category2.add("Electronics");
		 category2.add("Entertainment");
		 productList.add(new Product(++idCounter, "Speaker", category2, 5050.0, true, 2));
		 HashSet<String> category3 = new HashSet<>();
		 category3.add("Sports");
		 category3.add("Fitness");
		 productList.add(new Product(++idCounter, "Skipping Rope", category3, 100.0, true, 2));
		 HashSet<String> category4 = new HashSet<>();
		 category4.add("Sports");
		 category4.add("Fitness");
		 category4.add("Entertainment");
		 productList.add(new Product(++idCounter, "Badminton", category4, 1000.0, true, 2));
		 
		 
	 }
	 
	 public List<Product> findAll(){
		 return productList;
	 }
	 
	 public Product save(Product product)
	 {
		 if(product.getProductId()==-1 || product.getProductId()==0) {
				product.setProductId(++idCounter);
				productList.add(product);
			} else {
				deleteById(product.getProductId());
				productList.add(product);
			}
			return product;
	 }
	 
	 public Product deleteById(long id) {
			Product product = findById(id);
			
			if(product==null) return null;
			
			if(productList.remove(product)) {
				return product;
			}
			
			return null;
		}
	 
	 public Product findById(long id) {
			for(Product product : productList ) {if(product.getProductId() == id) {
				return product;
			}
		}
		
		return null;
	}
	 
	 public List<Product> priceGreaterThenMentioned( double Price)
		{
		 Collections.sort(productList);
			//System.out.println("Products with range greater than " + Price);
			List<Product> greaterPriceList = new ArrayList<>();
			for(Product p : productList)
			{
				if(p.getPrice() > Price)
				{
					greaterPriceList.add(p);
				}
			}
			
			return greaterPriceList;
		}

	 public List<Product> filterBasedOnAvailability( )
		{
		 List<Product> productsNotAvailable = new ArrayList<Product>();
			productsNotAvailable = productList.stream()
		      .filter(p -> !p.isAvailability())
		      .collect(Collectors.toList()); 
			return productsNotAvailable;
		}
	 
	 public  HashMap<String, HashSet<Product>> categoryWiseSegregation()
		{
		 HashMap<String, HashSet<Product>> mp = new HashMap<>();
			
			for (Product p : productList) 
			{
			      
			       
			       HashSet<String> listCategory = p.getCategory();
			       for(String category : listCategory)
			       {
			    	   HashSet<Product> hs = new HashSet<>();
			    	   if(mp.containsKey(category))
			    	   {
			    		   hs = mp.get(category);
			    		  
			    	   }
			    	   
			    	   hs.add(p);
			    	   mp.put(category, hs);
			    	   
			       }
			       
			}		
			
			return mp;
			
		}

	 public List<Product> productsIntersection(String[] Category) {
		 HashMap<String, HashSet<Product>> mp = categoryWiseSegregation();
			List<Product> filteredOnCategory = productList;
			List<Product> resultantList = new ArrayList<>();
			
		 for(String category : Category) {
			filteredOnCategory = filteredOnCategory.stream().filter(p -> p.getCategory().contains(category)).collect(Collectors.toList());
		 }
			for(Product p : filteredOnCategory)
		    {
		    	resultantList.add(p);
		    }
			return resultantList;
		}

}
