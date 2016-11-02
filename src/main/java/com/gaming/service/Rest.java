package com.gaming.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gaming.dto.Player;

@RestController
@RequestMapping("/")
public class Rest {

	@Autowired
	Repo repo;
	
	@RequestMapping("players" )
    public Iterable<Player> players() {
        return repo.findAll();
    }
	
	@RequestMapping("player")
	@ResponseBody
    public ResponseEntity<Player> player(@RequestBody Player player) {
        return ResponseEntity.ok(repo.save(player));
    }
	
	
}
