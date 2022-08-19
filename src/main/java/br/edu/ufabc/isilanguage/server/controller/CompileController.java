package br.edu.ufabc.isilanguage.server.controller;

import br.edu.ufabc.isilanguage.compiler.CompilerOutput;
import br.edu.ufabc.isilanguage.compiler.IsilanguageCompiler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

@RestController
public class CompileController {
    private String decode(String value) throws UnsupportedEncodingException {
        return URLDecoder.decode(value, StandardCharsets.UTF_8.toString());
    }
    private IsilanguageCompiler compiler = new IsilanguageCompiler();
    @CrossOrigin
    @GetMapping("/compile")
    public CompilerOutput compile(
            @RequestParam(
                    value="source",
                    defaultValue = "programa\n\tnumero a;\nfimprog;"
            ) String source
    ) {
        CompilerOutput compilerOutput;
        try {
            compilerOutput = compiler.compile(decode(source));
        }
        catch (UnsupportedEncodingException ex) {
            ex.printStackTrace();
            ArrayList<String> warnings = new ArrayList<String>();
            compilerOutput = new CompilerOutput("Invalid code!", ex.getMessage(), warnings);
        }
        return compilerOutput;
    }
}
