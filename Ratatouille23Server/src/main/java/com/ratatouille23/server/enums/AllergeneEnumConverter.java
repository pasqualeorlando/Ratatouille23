package com.ratatouille23.server.enums;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class AllergeneEnumConverter implements AttributeConverter<Allergene, String>{

    @Override
    public Allergene convertToEntityAttribute(String dbValue) {
    	return Allergene.getAllergene(dbValue);
    }

	@Override
	public String convertToDatabaseColumn(Allergene attribute) {
		return attribute.getNome();
	}
}
