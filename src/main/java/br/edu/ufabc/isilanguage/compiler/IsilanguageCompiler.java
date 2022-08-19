package br.edu.ufabc.isilanguage.compiler;

import br.edu.ufabc.isilanguage.compiler.CompilerOutput;

import java.util.ArrayList;
import java.util.Arrays;

import br.edu.ufabc.isilanguage.compiler.exceptions.IsiSemanticException;
import br.edu.ufabc.isilanguage.compiler.parser.IsiLangLexer;
import br.edu.ufabc.isilanguage.compiler.parser.IsiLangParser;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;

public class IsilanguageCompiler {
    public CompilerOutput compile(String source) {
        String content = "";//"prog\n\tnumero a;\n\tescreva(\"ola\");\nfimprog;";
        ArrayList<String> warnings = new ArrayList<String>();//Arrays.asList("Warnings 1","Warnings 2"));
        String error = "";

        try {
            IsiLangLexer lexer;
            IsiLangParser parser;
            lexer = new IsiLangLexer(CharStreams.fromString(source));
            CommonTokenStream tokenStream = new CommonTokenStream(lexer);
            parser = new IsiLangParser(tokenStream);
            parser.prog();
            content = parser.generateCode();
            warnings = parser.getWarnings();
        }
        catch(IsiSemanticException ex) {
            error = "Semantic error - " + ex.getMessage();
        }
        catch (NullPointerException ex) {
            error = "Compilation error - " + ex.getMessage();
        }

        catch(Exception ex) {
            ex.printStackTrace();
            System.err.println("ERROR "+ex.getMessage());
        }

        return new CompilerOutput(content, error, warnings);
    }
}
