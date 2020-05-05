using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Heliton_ReactSPA.Controllers
{
    [Route("api/[controller]")]
    public class AlunoController : Controller
    {
        private static List<ModeloAluno> Alunos = new List<ModeloAluno>();

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<ModeloAluno> Get()
        {
            try
            {
                List<ModeloAluno> aluno = Alunos.ToList();
                foreach (ModeloAluno model in aluno)
                {
                    model.Estado = new EstadoController.ModeloEstado();
                    model.Estado = EstadoController.Get(model.IdEstado);
                }
                return aluno.ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public ModeloAluno Get(int id)
        {
            try
            {
                ModeloAluno aluno = Alunos.Where(r => r.Id == id).ToList().FirstOrDefault();
                aluno.Estado = new EstadoController.ModeloEstado();
                aluno.Estado = EstadoController.Get(aluno.IdEstado);
                return aluno;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public string Post([FromBody]object value)
        {
            try
            {
                string output = JsonConvert.SerializeObject(value);
                ModeloAluno model = JsonConvert.DeserializeObject<ModeloAluno>(output);
                var maxValue = Alunos.Count == 0 ? 0 : Alunos.Max(x => x.Id);
                model.Id = maxValue + 1;
                Alunos.Add(model);
            }
            catch (Exception erro)
            {
                return erro.ToString();
            }
            return "OK";
        }

        // PUT api/<controller>/5
        [HttpPut]
        public string Put([FromBody]object value)
        {
            try
            {
                string output = JsonConvert.SerializeObject(value);
                ModeloAluno modelS = JsonConvert.DeserializeObject<ModeloAluno>(output);

                var query = (from stud in Alunos where stud.Id == modelS.Id select stud);
                foreach (ModeloAluno model in query)
                {
                    model.IdEstado = modelS.IdEstado;
                    model.Nome = modelS.Nome;
                    model.Sexo = modelS.Sexo;
                    model.Carro = modelS.Carro;
                    model.Casa = modelS.Casa;
                }
            }
            catch (Exception erro)
            {
                return erro.ToString();
            }
            return "OK";
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            try
            {
                var item = Alunos.Single(r => r.Id == id);
                Alunos.Remove(item);
            }
            catch (Exception erro)
            {
                return erro.ToString();
            }
            return "OK";
        }

        // Modelo //
        public class ModeloAluno
        {
            public int Id { get; set; }
            public int IdEstado { get; set; }
            public string Nome { get; set; }
            public string Sexo { get; set; }
            public bool Carro { get; set; }
            public bool Casa { get; set; }

            public virtual EstadoController.ModeloEstado Estado { get; set; }
        }
    }
}
