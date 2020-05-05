using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Heliton_ReactSPA.Controllers
{
    [Route("api/[controller]")]
    public class EstadoController : Controller
    {
        private static readonly List<ModeloEstado> Estados = new List<ModeloEstado>() {
                                                            new ModeloEstado(){ Id = 1, NmEstado = "Acre" },
                                                            new ModeloEstado(){ Id = 2, NmEstado = "Alagoas" },
                                                            new ModeloEstado(){ Id = 3, NmEstado = "Amapá" },
                                                            new ModeloEstado(){ Id = 4, NmEstado = "Amazonas" },
                                                            new ModeloEstado(){ Id = 5, NmEstado = "Bahia" },
                                                            new ModeloEstado(){ Id = 6, NmEstado = "Ceará" },
                                                            new ModeloEstado(){ Id = 7, NmEstado = "Distrito Federal" },
                                                            new ModeloEstado(){ Id = 8, NmEstado = "Espírito Santo" },
                                                            new ModeloEstado(){ Id = 9, NmEstado = "Goiás" },
                                                            new ModeloEstado(){ Id = 10, NmEstado = "Maranhão" },
                                                            new ModeloEstado(){ Id = 11, NmEstado = "Mato Grosso" },
                                                            new ModeloEstado(){ Id = 12, NmEstado = "Mato Grosso do Sul" },
                                                            new ModeloEstado(){ Id = 13, NmEstado = "Minas Gerais" },
                                                            new ModeloEstado(){ Id = 14, NmEstado = "Pará" },
                                                            new ModeloEstado(){ Id = 15, NmEstado = "Paraíba" },
                                                            new ModeloEstado(){ Id = 16, NmEstado = "Paraná" },
                                                            new ModeloEstado(){ Id = 17, NmEstado = "Pernambuco" },
                                                            new ModeloEstado(){ Id = 18, NmEstado = "Piauí" },
                                                            new ModeloEstado(){ Id = 19, NmEstado = "Rio de Janeiro" },
                                                            new ModeloEstado(){ Id = 20, NmEstado = "Rio Grande do Norte" },
                                                            new ModeloEstado(){ Id = 21, NmEstado = "Rio Grande do Sul" },
                                                            new ModeloEstado(){ Id = 22, NmEstado = "Rondônia" },
                                                            new ModeloEstado(){ Id = 23, NmEstado = "Roraima" },
                                                            new ModeloEstado(){ Id = 24, NmEstado = "Santa Catarina" },
                                                            new ModeloEstado(){ Id = 25, NmEstado = "São Paulo" },
                                                            new ModeloEstado(){ Id = 26, NmEstado = "Sergipe" },
                                                            new ModeloEstado(){ Id = 27, NmEstado = "Tocantins" }};

        // GET: api/<controller>
        [HttpGet("[action]")]
        public IEnumerable<ModeloEstado> ListaEstado()
        {
            return Estados;
        }

        // GET: utilizado pelo controler Aluno //
        public static ModeloEstado Get(int id)
        {
            return Estados.Where(r => r.Id == id).ToList().FirstOrDefault();
        }

        // Modelo //
        public class ModeloEstado
        {
            public int Id { get; set; }
            public string NmEstado { get; set; }
        }

    }
}