<template>
  <footer class="bg-primary-900 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div class="col-span-1">
          <h3 class="text-2xl font-bold mb-4">Climm.</h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            Forros de PVC para transformar seu ambiente com qualidade e sustentabilidade.
          </p>
        </div>

        <!-- Links -->
        <div class="col-span-1">
          <h4 class="text-lg font-bold mb-4 text-primary-200">Explorar</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="#sobre" class="hover:text-white transition-colors">Sobre</a></li>
            <li><a href="#produtos" class="hover:text-white transition-colors">Produtos</a></li>
            <li><a href="#contato" class="hover:text-white transition-colors">Contato</a></li>
          </ul>
        </div>

        <!-- Social -->
        <div class="col-span-1">
          <h4 class="text-lg font-bold mb-4 text-primary-200">Siga-nos</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="#" class="hover:text-white transition-colors">Facebook</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Twitter</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-span-1">
          <h4 class="text-lg font-bold mb-4 text-primary-200">Contato</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a href="mailto:climmpvc@gmail.com" class="hover:text-white transition-colors">climmpvc@gmail.com</a></li>
            <li><a href="tel:(32)985150220" class="hover:text-white transition-colors">(32) 9 8515-0220</a></li>
            <li class="leading-relaxed">R. Ten. Lucas Drumont, 75 - Jardim Natal, Juiz de Fora - MG</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-sm text-center md:text-left">
          &copy; {{ new Date().getFullYear() }} Climm Forros PVC. Todos os direitos reservados.
        </p>
        <div class="flex gap-6 text-sm text-gray-500">
          <a href="#" class="hover:text-white transition-colors">Privacidade</a>
          <a href="#" class="hover:text-white transition-colors">Termos</a>
        </div>
      </div>
    </div>
  </footer>
</template>
