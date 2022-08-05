package datastructures;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class IsiSymbolTable {
	
	private HashMap<String, IsiSymbol> map;
	
	public IsiSymbolTable() {
		map = new HashMap<String, IsiSymbol>();
	}
	
	public void add(IsiSymbol symbol) {
		map.put(symbol.getName(), symbol);
	}
	
	public boolean exists(String symbolName) {
		return map.get(symbolName) != null;
	}
	
	public IsiSymbol get(String symbolName) {
		return map.get(symbolName);
	}

	public List<IsiSymbol> getNotUsedSymbols() {
		ArrayList<IsiSymbol> symbols = this.getAll();
		return symbols.stream()
				.filter(symbol -> !symbol.isUsed)
				.collect(Collectors.toList());
	}
	
	public String getTypeBy(String id) {
		IsiVariable variable = (IsiVariable) this.get(id);
		switch (variable.getType()) {
			case IsiVariable.NUMBER: 
				return "NUMBER";
			case IsiVariable.TEXT:
				return "TEXT";
			case IsiVariable.CHAR:
				return "CHAR";
			case IsiVariable.BOOLEAN:
				return "BOOLEAN";
			default:
				return "";
		}
	}

	public boolean checkInitialized(String id) {
		IsiSymbol  symbol = this.get(id);
		return symbol.isInitialized();
	}

	public void setInitializedBy(String id) {
		IsiVariable variable = (IsiVariable) this.get(id);
		variable.setInitialized();
	}

	public ArrayList<IsiSymbol> getAll(){
		ArrayList<IsiSymbol> list = new ArrayList<>();
		for (IsiSymbol symbol : map.values()) {
			list.add(symbol);
		}
		return list;
	}
}