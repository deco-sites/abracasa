export default function Form() {
    return (
      <form className="flex flex-col items-end justify-end max-w-[1180px] mx-auto">
        {/* Linha 1: Nome Completo */}
        <div class="w-full h-full flex flex-row items-start justify-center gap-3">
            <div class="w-full gap-3"> 
                <div className="mb-4">
                <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-600 mb-1">
                    Nome Completo:*
                </label>
                <input type="text" id="nomeCompleto" name="nomeCompleto" className="w-full p-2 border" />
                </div>
        
                {/* Linha 2: E-mail e Celular */}
                <div className="flex mb-4">
                {/* E-mail */}
                    <div className="w-1/2 pr-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                        E-mail:*
                        </label>
                        <input type="email" id="email" name="email" className="w-full p-2 border" />
                    </div>
        
                    {/* Celular */}
                    <div className="w-1/2 pl-2">
                        <label htmlFor="celular" className="block text-sm font-medium text-gray-600 mb-1">
                        Celular:*
                        </label>
                        <input type="tel" id="celular" name="celular" className="w-full p-2 border" />
                    </div>
                </div>
            </div>
            
            <div class="w-full h-full flex items-center justify-end">
                <div className="mb-4">
                    <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-600 mb-1">
                        Digite sua mensagem:*
                    </label>
                    <textarea id="mensagem" name="mensagem" rows={4} cols={80} maxlength={750} className="lg:min-w-[400px] lg:min-h-[113px] resize-none p-2 border"></textarea>
                </div>
            </div>
        </div>
        <div>
            {/* Botão Enviar */}
            <button type="submit" className="text-sm text-white bg-[#555555] py-2 px-12 hover:bg-[#2c2c2c]">
                ENVIAR
            </button>
        </div>
        {/* Linha 3: Mensagem */}
      </form>
    );
  }
  