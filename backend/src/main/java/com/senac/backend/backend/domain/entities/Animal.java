package com.senac.backend.backend.domain.entities;

import com.senac.backend.backend.domain.enuns.EnumEspecieAnimal;
import com.senac.backend.backend.domain.enuns.EnumStatusAnimal;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "animal")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameAnimal;

    private String raca;

    @Column(columnDefinition = "TEXT")
    private String urlFoto;

    private EnumEspecieAnimal especie;

    private EnumStatusAnimal statusAnimal = EnumStatusAnimal.DISPONIVEL;

}
