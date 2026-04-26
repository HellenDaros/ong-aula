package com.senac.backend.backend.controllers;

import com.senac.backend.backend.model.DTO.AlterarStatusAnimalRequest;
import com.senac.backend.backend.model.entities.Animal;
import com.senac.backend.backend.model.repository.AnimalRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/animais")
@Tag(name = "Gestão de Animais", description = "Serviços para controle do catálogo de pets")
public class AnimalController {


    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping
    @Operation(summary = "Listar todos os pets", description = "Retorna a lista completa de animais cadastrados")
    public ResponseEntity<?> listarTodos(){

        var animais = animalRepository.findAll();
        return ResponseEntity.ok(animais);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar pet por ID", description = "Retorna os detalhes de um animal específico")
    public ResponseEntity<Animal> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(animalRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(summary = "Cadastrar novo pet", description = "Adiciona um novo animal ao sistema")
    public  ResponseEntity<Long> salvar(@RequestBody Animal animal){
        animal.setId(null);
        return  ResponseEntity.ok(animalRepository.save(animal).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar dados do pet", description = "Altera informações de um animal já cadastrado")
    public ResponseEntity<?> salvar(@PathVariable Long id, @RequestBody Animal animal){

        var animalBanco = animalRepository.findById(id).orElse(null);

        if(animalBanco != null){
            animalBanco.setNameAnimal(animal.getNameAnimal());
            animalBanco.setRaca(animal.getRaca());
            animalBanco.setUrlFoto(animal.getUrlFoto());
            animalBanco.setEspecie(animal.getEspecie());
            animalBanco.setStatusAnimal(animal.getStatusAnimal());
            animalRepository.save(animalBanco);

            return  ResponseEntity.ok("Atualizado com sucesso!");

        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/AlterarStatusAnimal")
    @Operation(summary = "Alterar Status de Adoção", description = "Atualiza o estado do animal (ex: Disponível, Inativo, Adotado)")
    public  ResponseEntity<?> AlterarStatusAnimal(@PathVariable Long id, @RequestBody AlterarStatusAnimalRequest statusAnimalRequest) {
        var animalBanco = animalRepository.findById(id).orElse(null);
        if (animalBanco != null){
            animalBanco.setStatusAnimal(statusAnimalRequest.statusAnimal());
            animalRepository.save(animalBanco);
            return ResponseEntity.ok("Atualizado com sucesso!");
        }
        return ResponseEntity.notFound().build();
    }
}