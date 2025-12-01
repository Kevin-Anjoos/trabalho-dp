package com.example.trabalhomercado.dto;


public class CarrinhoDto {
    private Long id;
    private ProdutoDto produto;
    private Integer quantidade;

    public CarrinhoDto(Long id, ProdutoDto produto, Integer quantidade) {
        this.id = id;
        this.produto = produto;
        this.quantidade = quantidade;
    }
    // Getters omitidos

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProdutoDto getProduto() {
        return produto;
    }

    public void setProduto(ProdutoDto produto) {
        this.produto = produto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
