

const Nosotros = () => {

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      
      {/* Sección Principal - Encabezado */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-green-900 tracking-tight">
          Horizonte Institucional
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto italic">
         Formando seres críticos para un desarrollo integral.
        </p>
      </section>

      {/* Sección Misión y Visión - Grid para mejor lectura */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-green-600 space-y-3">
          <h2 className="text-2xl font-bold text-green-800">Misión</h2>
          <p className="text-slate-600 leading-relaxed">
            La Institución Educativa Rural Departamental Kennedy, forma a los estudiantes integralmente con una sólida estructura en valores humanos, conocimiento científico, competencias ciudadanas, democráticas, de emprendimiento creativo y laborales. En un proceso de integración con instituciones de educación superior y organizaciones no gubernamentales. 
            Todo lo anterior enmarcado en un contexto rural bajo las premisas de producción agropecuaria y prácticas ecoturísticas, que conlleven al estudiante empoderado, a ser parte activa de la comunidad, ejerciendo las capacidades y conocimientos construidos en su proceso de formación. 
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-900 space-y-3">
          <h2 className="text-2xl font-bold text-blue-900">Visión</h2>
          <p className="text-slate-600 leading-relaxed">
            La Institución Educativa Rural Departamental Kennedy, en el año 2030, deberá ser una institución modelo regional, provincial, departamental y nacional, líder en los procesos de formación estudiantil en las modalidades agropecuaria y ecoturística, con un alto componente en formación en valores y formación científica. 
            Será una institución formadora de estudiantes con gran capacidad de pensamiento crítico, creativo y transformador.
          </p>
        </div>
      </section>

      {/* Sección Sistema Institucional de Evaluación (SIE) */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold text-green-900">
            Sistema Institucional de Evaluación (SIE)
          </h2>
          <p className="text-lg text-slate-700 italic">
            Definición del sistema institucional de evaluación de los estudiantes
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <p className="text-slate-700 leading-relaxed mb-6">
            El sistema de evaluación institucional de los estudiantes que hace parte del proyecto educativo institucional debe contener:
          </p>

          <div className="space-y-5">
            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-green-600">
              <span className="font-bold text-green-700 text-lg shrink-0">1.</span>
              <p className="text-slate-700 leading-relaxed">
                Los criterios de evaluación y promoción.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-blue-600">
              <span className="font-bold text-blue-700 text-lg shrink-0">2.</span>
              <p className="text-slate-700 leading-relaxed">
                La escala de valoración institucional y su respectiva equivalencia con la escala nacional.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-purple-600">
              <span className="font-bold text-purple-700 text-lg shrink-0">3.</span>
              <p className="text-slate-700 leading-relaxed">
                Las estrategias de valoración integral de los desempeños de los estudiantes.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-amber-600">
              <span className="font-bold text-amber-700 text-lg shrink-0">4.</span>
              <p className="text-slate-700 leading-relaxed">
                Las acciones de seguimiento para el mejoramiento de los desempeños de los estudiantes durante el año escolar.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-green-600">
              <span className="font-bold text-green-700 text-lg shrink-0">5.</span>
              <p className="text-slate-700 leading-relaxed">
                Los procesos de autoevaluación de los estudiantes.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-blue-600">
              <span className="font-bold text-blue-700 text-lg shrink-0">6.</span>
              <p className="text-slate-700 leading-relaxed">
                Las estrategias de apoyo necesarias para resolver situaciones pedagógicas pendientes de los estudiantes.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-purple-600">
              <span className="font-bold text-purple-700 text-lg shrink-0">7.</span>
              <p className="text-slate-700 leading-relaxed">
                Las acciones para garantizar que los directivos docentes y docentes del establecimiento educativo cumplan con procesos evaluativos estipulados en el sistema institucional de evaluación.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-amber-600">
              <span className="font-bold text-amber-700 text-lg shrink-0">8.</span>
              <p className="text-slate-700 leading-relaxed">
                La periodicidad de entrega de informes a los padres de familia.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-green-600">
              <span className="font-bold text-green-700 text-lg shrink-0">9.</span>
              <p className="text-slate-700 leading-relaxed">
                La estructura de los informes de los estudiantes, para que sean claros, comprensibles y den información integral del avance en la formación.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-blue-600">
              <span className="font-bold text-blue-700 text-lg shrink-0">10.</span>
              <p className="text-slate-700 leading-relaxed">
                Las instancias, procedimientos y mecanismos de atención y resolución de reclamaciones de padres de familia y estudiantes sobre la evaluación y promoción.
              </p>
            </div>

            <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border-l-4 border-purple-600">
              <span className="font-bold text-purple-700 text-lg shrink-0">11.</span>
              <p className="text-slate-700 leading-relaxed">
                Los mecanismos de participación de la comunidad educativa en la construcción del sistema institucional de evaluación de los estudiantes.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 italic text-center">
              (Decreto 1290 de 2009, artículo 4)
            </p>
          </div>
        </div>
      </section>

      {/* Sección Filosofía Institucional */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold text-green-900">Filosofía Institucional</h2>
          <p className="text-lg text-slate-700 italic">
            Nuestra filosofía se resume y se fundamenta en los siguientes pilares
          </p>
        </div>

        <div className="space-y-8">
          {/* Pilar 1 */}
          <div className="bg-gradient-to-r from-green-50 to-white p-8 rounded-2xl shadow-sm border border-green-100">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              1. La Dialéctica y la Teoría Crítica
            </h3>
            
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                El modelo dialógico está íntimamente relacionado con la dialéctica, un proceso de pensamiento y reflexión que se basa en el diálogo y el conflicto de ideas para llegar a una mayor comprensión y verdad. Esta visión filosófica proviene de la dialéctica hegeliana, que influenció a Paulo Freire. La dialéctica sostiene que la realidad no es estática, sino que está en constante cambio y transformación, y que el conocimiento se construye a través de la interacción y el contraste de ideas opuestas.
              </p>
              
              <div className="pl-6 border-l-2 border-green-300 space-y-3">
                <p>
                  <strong className="text-green-900">Transformación social y emancipación:</strong> Para Freire, la educación no es solo un proceso de adquisición de conocimientos, sino una forma de liberación. La dialéctica educativa se basa en el principio de que el aprendizaje se produce cuando los estudiantes se confrontan con las contradicciones sociales y culturales que viven, reflexionan sobre ellas y actúan para transformarlas. Este proceso de concientización permite a los estudiantes superar las desigualdades y desarrollar una conciencia crítica de su situación, lo que los capacita para cambiar su realidad.
                </p>
                
                <p>
                  <strong className="text-green-900">Educación como práctica de libertad:</strong> En este sentido, la educación dialógica es un acto de libertad, ya que permite que tanto educadores como estudiantes se liberen de las estructuras de poder que perpetúan la desigualdad y la opresión. El modelo dialógico promueve la autonomía del estudiante, quien se convierte en sujeto de su propio aprendizaje.
                </p>
              </div>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl shadow-sm border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              2. El Dialogismo de Mikhail Bakhtin
            </h3>
            
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Mikhail Bakhtin, un filósofo y teórico literario ruso, es una de las figuras clave en la fundamentación filosófica del modelo dialógico, particularmente en lo que respecta a la importancia del diálogo en la construcción del conocimiento. Según Bakhtin, el lenguaje es fundamentalmente dialógico y el sentido se construye a través de la interacción entre las voces de los sujetos.
              </p>
              
              <div className="pl-6 border-l-2 border-blue-300 space-y-3">
                <p>
                  <strong className="text-blue-900">El concepto de "polifonía":</strong> Bakhtin introdujo la idea de la polifonía, que sugiere que las voces de diferentes individuos (con sus propios puntos de vista, experiencias y contextos) deben ser escuchadas y respetadas para que se dé una verdadera comprensión. Este principio se aplica directamente al aula, donde las diversas voces de los estudiantes, con sus conocimientos y experiencias previas, deben ser consideradas en el proceso de enseñanza-aprendizaje.
                </p>
                
                <p>
                  <strong className="text-blue-900">El diálogo como proceso de construcción de sentido:</strong> Según Bakhtin, el sentido se construye a través de la interacción. En la pedagogía dialógica, este principio se refleja en la interacción constante entre el docente y los estudiantes, así como entre los propios estudiantes. A través de este diálogo, se generan nuevas formas de entender la realidad, creando un conocimiento que es colectivo y no impuesto desde una autoridad externa.
                </p>
              </div>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-gradient-to-r from-purple-50 to-white p-8 rounded-2xl shadow-sm border border-purple-100">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              3. El Humanismo y la Dignidad del Ser Humano
            </h3>
            
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                El modelo dialógico se basa en una visión humanista de la educación, que parte de la dignidad y el valor intrínseco de cada ser humano. Los principios de igualdad, respeto mutuo, y reconocimiento de la subjetividad de los estudiantes son fundamentales en este enfoque. Esta visión humanista se aleja de la concepción tradicional de la educación, que a menudo ve al estudiante como un receptor pasivo de conocimiento, y lo coloca como sujeto activo y co-creador de su propio proceso de aprendizaje.
              </p>
              
              <div className="pl-6 border-l-2 border-purple-300">
                <p>
                  <strong className="text-purple-900">Educación integral:</strong> La educación, desde la perspectiva dialógica, no solo debe estar orientada al desarrollo intelectual, sino también a la formación emocional, social y ética de los estudiantes. En este sentido, el diálogo se convierte en una herramienta para fomentar la autonomía y la responsabilidad del estudiante en su vida personal y en la sociedad.
                </p>
              </div>
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="bg-gradient-to-r from-amber-50 to-white p-8 rounded-2xl shadow-sm border border-amber-100">
            <h3 className="text-2xl font-bold text-amber-800 mb-4">
              4. La Libertad y la Autonomía
            </h3>
            
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                La libertad es un valor fundamental en el modelo dialógico, entendido no como la libertad individual aislada, sino como la capacidad de los individuos para autodeterminarse y transformar su entorno a través del diálogo y la acción colectiva.
              </p>
              
              <div className="pl-6 border-l-2 border-amber-300">
                <p>
                  <strong className="text-amber-900">Educación liberadora:</strong> En el modelo de Paulo Freire, la educación dialógica tiene una finalidad liberadora, entendiendo la liberación como la capacidad de los individuos para superar las limitaciones impuestas por las estructuras de poder y de opresión. Freire propugna una educación que no solo permita a los estudiantes aprender contenidos académicos, sino también tomar conciencia crítica de su propia situación y de las injusticias sociales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Nosotros;