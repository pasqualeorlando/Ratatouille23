package com.ratatouille23.server.enums;

public enum Allergene {
	Arachidi("Arachidi"),
	FruttaAGuscio("Frutta a guscio"),
	Latte("Latte"),
	Molluschi("Molluschi"),
	Pesce("Pesce"),
	Sesamo("Sesamo"),
	Soia("Soia"),
	Crostacei("Crostacei"),
	Glutine("Glutine"),
	Lupini("Lupini"),
	Senape("Senape"),
	Sedano("Sedano"),
	AnidrideSolforosaSolfiti("Anidride solforosa e solfiti"),
	Uova("Uova");
	
	private String nome;
	
	private Allergene(String nome) {
		this.nome = nome;
	}
	
	public String getNome() { 
		return nome;
	}
	
	public static Allergene getAllergene(String nome) {
		if(!nome.equals("Frutta a guscio") && !nome.equals("Anidride solforosa e solfiti"))
    		return Allergene.valueOf(nome);
    	else {
    		if(nome.equals("Frutta a guscio"))
    			return Allergene.FruttaAGuscio;
    		else
    			return Allergene.AnidrideSolforosaSolfiti;
    	}
	}
	
}
