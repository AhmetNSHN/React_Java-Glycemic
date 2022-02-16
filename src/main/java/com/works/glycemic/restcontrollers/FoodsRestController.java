package com.works.glycemic.restcontrollers;

import com.works.glycemic.models.Foods;
import com.works.glycemic.services.FoodService;
import com.works.glycemic.utils.REnum;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
@RequestMapping("/foods")
public class FoodsRestController {

    final FoodService foodService;
    public FoodsRestController(FoodService foodService) {
        this.foodService = foodService;
    }

    // Foods Save
    @PostMapping("/save")
    public Map<REnum, Object> save(@RequestBody Foods foods) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        Foods f = foodService.foodsSave(foods);
        if ( f == null ) {
            hm.put(REnum.status, false);
            hm.put(REnum.message, "Bu ürün daha önce kayıt edilmiş");
            hm.put(REnum.result, f);
        }else {
            hm.put(REnum.status, true);
            hm.put(REnum.message, "Ürün kayıt başarılı");
            hm.put(REnum.result, f);
        }
        return hm;
    }


    // foods List
    @Cacheable("food_list")
    @GetMapping("/list")
    public Map<REnum, Object> list() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        hm.put(REnum.status, true);
        hm.put(REnum.message, "Ürün Listesi");
        hm.put(REnum.result, foodService.foodsList() );
        return hm;
    }


    // user Food List
    @GetMapping("/userFoodList")
    public Map<REnum, Object> userFoodList() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        hm.put(REnum.status, true);
        hm.put(REnum.message, "Ürün Listesi");
        hm.put(REnum.result, foodService.userFoodList());
        return hm;
    }

    // foods List
    @GetMapping("/adminWaitFoodList")
    public Map<REnum, Object> adminWaitFoodList() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        hm.put(REnum.status, true);
        hm.put(REnum.message, "Ürün Listesi");
        hm.put(REnum.result, foodService.adminWaitFoodList());
        return hm;
    }


    @DeleteMapping("/foodDelete")
    public Map<REnum, Object> foodDelete(@RequestParam long gid) {
        return foodService.foodDelete(gid);
    }

    //user delete food
    @PutMapping("update")
    public Map<REnum,Object> userUpdateFood(@RequestBody Foods food){
        return foodService.userUpdateFood(food);
    }

    @GetMapping("/detail/{foodUrl}")
    public Map<REnum,Object> getFood(@PathVariable String foodUrl){
        Map<REnum, Object> hm = new LinkedHashMap<>();
        Foods result = foodService.getFood(foodUrl);
        if(result != null)
        {
            hm.put(REnum.status, true);
            hm.put(REnum.message, "Ürün Listesi");
            hm.put(REnum.result, result);
        }
        else
        {
            hm.put(REnum.status, false);
            hm.put(REnum.message, "Ürün Kaydi Bulunamadi");
        }

        return hm;

    }

}


