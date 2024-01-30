const storesHTML = `
<li class="casa-shopping" style="display: none">
    <h4>CASA SHOPPING</h4>
    <p>
        Avenida Ayrton Senna, 2150 - Barra da Tijuca, Rio de Janeiro - RJ,
        22775-900.
    </p>
    <p>Casa Shopping - Bloco F Loja F</p>
    <p>
        Telefone: (21) 2431-7260 /
        <a
            href="https://bit.ly/3Ymg9kQ"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 97109-3039 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="copacabana" style="display: none">
    <h4>COPACABANA</h4>
    <p>
        Endereço: Av. N.S. de Copacabana 1137 - A - Copacabana - Rio de Janeiro
        - RJ
    </p>
    <p>
        Telefone: (21) 3496-0585 /
        <a
            href="https://bit.ly/3XRgtZ7"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 99863-0486 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="sao-paulo-guide-shop" style="display: none">
    <h4>PINHEIROS - SP</h4>
    <p>Rua Teodoro Sampaio, 1312 - Pinheiros, São Paulo - SP, 05406-100.</p>
    <p>
        Telefone:
        <a
            href="https://bit.ly/3HysxaG"
            target="_blank"
            rel="noopener noreferrer"
            >(11) 93063-6723 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="sp-tatuape" style="display: none">
    <h4>TATUAPÉ - SP</h4>
    <p>Endereço: Rua Emilia Marengo 305 e 309 - Tatuapé, São Paulo - SP, 03336-000</p>
    <p>
        Telefone: 
        <a
            href="https://bit.ly/44JBrwJ"
            target="_blank"
            rel="noopener noreferrer"
            >(11) 96840-2748 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="sp-vila-nova" style="display: none">
    <h4>Vila Nova Conceição- SP</h4>
    <p>Endereço: R. João Cachoeira, 1091 - Vila Nova Conceição, São Paulo - SP, 04535-013</p>
    <p>
        Telefone: 
        <a
            href="https://bit.ly/3B8sSy5"
            target="_blank"
            rel="noopener noreferrer"
            >(11) 96498-6764 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="rio-sul" style="display: none">
    <h4>RIO SUL</h4>
    <p>Endereço: Rio Sul - Rua Lauro Muller, 116 LJ 76G – 4º Piso</p>
    <p>
        Telefone: (21) 2275-577 /
        <a
            href="https://bit.ly/3DBjBQT"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 99787-4278 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="icaraí-cdb" style="display: none">
    <h4>ICARAÍ</h4>
    <p>Endereço: Rua Gavião Peixoto, 68. Icaraí, Niterói</p>
    <p>
        Telefone: (21) 3620-0200 /
        <a
            href="https://bit.ly/3JGtDns"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 97117-4540 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="tijuca" style="display: none">
    <h4>SHOPPING TIJUCA</h4>
    <p>
        Endereço: Avenida Maracanã , 987 - bloco 4 - loja 35 (Subsolo) -
        Shopping Tijuca
    </p>
    <p>
        Telefone: (21) 3172-4678 /
        <a
            href="https://bit.ly/3JFjeZd"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 99722-3184 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="via-parque" style="display: none">
    <h4>VIA PARQUE - OUTLET E PONTA</h4>
    <p>
        Endereço: Avenida Ayrton Senna, 3000 - Barra da Tijuca, Rio de Janeiro -
        RJ, 22.775-003
    </p>
    <p>Shopping Via Parque - 1.125 B1</p>
    <p>
        Telefone: (21) 3042-0008 /
        <a
            href="https://bit.ly/3YjaXON"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 97109-6391 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="norte-shopping" style="display: none">
    <h4>NORTE SHOPPING</h4>
    <p>Av. Dom Helder Câmara, 5332 - Loja 1101 - 1° Piso</p>
    <p>
        Telefone: (21) 3172-3684 /
        <a
            href="http://bit.ly/norteshopp"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 99778-5030 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="recreio" style="display: none">
    <h4>RECREIO SHOPPING</h4>
    <p>Av. das Américas, 19019, loja 203 FGHI – 2º piso</p>
    <p>
        Telefone: (21) 3030-5397 /
        <a
            href="https://bit.ly/3Rv37PG"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 97109-7308 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="barra-shopping" style="display: none">
    <h4>BARRA SHOPPING</h4>
    <p>
        Endereço: Avenida das Américas, 4.666 - Barra da Tijuca, Rio de Janeiro
        - RJ, 22640-102.
    </p>
    <p>Barra Shopping - Nível Lagoa Loja 122B</p>
    <p>
        Telefone: (21) 3349-6416 /
        <a
            href="https://bit.ly/3wSHXlm"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 97113-6523 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="rio-sul-cdb" style="display: none">
    <h4>SHOPPING RIO SUL</h4>
    <p>Rua Lauro Muller, 116 LJ D76AB – 4º Piso</p>
    <p>
        Telefone: (21) 3496-8006 /
        <a
            href="https://bit.ly/3wPDPSX"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 97109-6119 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="via-parque-cdb" style="display: none">
    <h4>VIA PARQUE SHOPPING</h4>
    <p>Av. Ayrton Senna, 3000 - 1º piso - Lj. 1120</p>
    <p>
        Telefone: (21) 3795-6453 /
        <a
            href="https://bit.ly/3DCJ8sZ"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 96730-6805 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>

<li class="icarai-cdb" style="display: none">
    <h4>ICARAÍ</h4>
    <p>Rua Miguel de Frias, 112</p>
    <p>
        Telefone: (21) 3617-1950 /
        <a
            href="https://bit.ly/3wPOLjp"
            target="_blank"
            rel="noopener noreferrer"
            >(21) 97109-4173 <span class="whatsapp-icon"></span
        ></a>
    </p>
</li>
`;

export default storesHTML;
