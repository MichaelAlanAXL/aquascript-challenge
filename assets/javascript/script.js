fetch('./assets/data/moviesdata.json')
	.then(res => res.json())
	.then(data => {
		const container = document.getElementById('container-filmes');
		const filmes = data.movies;
		const pagination = document.getElementById('pagination');

		const filmesPorPagina = 6;
		let paginaAtual = 1;

		function renderFilmes(pagina) {
			container.innerHTML ='';
			const inicio = (pagina -1) * filmesPorPagina;
			const fim = inicio + filmesPorPagina;
			const filmesPagina = filmes.slice(inicio, fim);

			filmesPagina.forEach(movie => {
				const card = document.createElement('div');
				card.classList.add('card');
	
				card.innerHTML = `
					<img src="${movie.posterUrl}"  alt="Pôster de ${movie.title}" onerror="this.src='assets/images/sem-imagem.png'">
					<h2>${movie.title}</h2>
					<p class="diretor">${movie.director}</p>

					<div class="tooltip">
						<p class="plot">${movie.plot.length > 150 ? movie.plot.slice(0, 150) + '...' : movie.plot}</p>
						<span class="tooltiptext">${movie.plot}</span>						
					</div>

					<p class="diretor">${movie.year}</p>
					<p><strong>Atores:</strong> ${movie.actors}</p>
					<p>${movie.genres.map(genero => `<span class="genero">${genero}</span>`).join(' ')}</p>
				`;
	
				container.appendChild(card);
			});

			container.scrollIntoView({ behavior: "smooth" });
		}

		function renderPaginacao() {
			const totalPaginas = Math.ceil(filmes.length / filmesPorPagina);
			pagination.innerHTML = '';

			const btnAnterior = document.createElement('button');
			btnAnterior.textContent = 'Anterior';
			btnAnterior.disabled = paginaAtual === 1;
			btnAnterior.addEventListener('click', () => {
				paginaAtual--;
				renderFilmes(paginaAtual);
				renderPaginacao();
			});
			pagination.appendChild(btnAnterior);

			for (let i = 1; i <= totalPaginas; i++) {
				const btn = document.createElement('button');
				btn.textContent = i;
				btn.classList.add('page-button');
				if (i === paginaAtual) btn.classList.add('active');

				btn.addEventListener('click', () => {
					paginaAtual = i;
					renderFilmes(paginaAtual);
					renderPaginacao();
				});

				pagination.appendChild(btn);
			}
			// Botão Próximo
			const btnProximo = document.createElement('button');
			btnProximo.textContent = 'Próximo';
			btnProximo.disabled = paginaAtual === totalPaginas;
			btnProximo.addEventListener('click', () => {
				paginaAtual++;
				renderFilmes(paginaAtual);
				renderPaginacao();
			});
			pagination.appendChild(btnProximo);
		}

		renderFilmes(paginaAtual);
		renderPaginacao();			

});