import { useContext, useState } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';
import { supabase } from '../lib/supabase';

export default function CTAFinal() {
  const { lang } = useContext(LangContext);
  const t = content[lang].ctaFinal;
  const f = t.form;
  const ref = useScrollAnim();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', city: '', source: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (supabase) {
      const { error: dbError } = await supabase
        .from('student_leads')
        .insert([{ ...formData, lang }]);

      if (dbError) {
        setError(lang === 'es'
          ? 'Hubo un error al enviar. Por favor intenta de nuevo.'
          : 'There was an error submitting. Please try again.');
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="registro" className="cta-final section--cream" ref={ref}>
      <div className="container">
        <div className="cta-final__inner">
          <div className="cta-final__left anim-ready" style={{ '--delay': '0s' }}>
            <h2 className="cta-final__quote">{t.quote}</h2>
            <p className="cta-final__tagline">{t.tagline}</p>
            <a href="#registro" className="btn btn--lime btn--lg">
              {f.submit}
            </a>
          </div>

          <div className="cta-final__right anim-ready" style={{ '--delay': '0.2s' }}>
            {submitted ? (
              <div className="form-success">
                <div className="form-success__icon">✓</div>
                <p>{f.success}</p>
              </div>
            ) : (
              <form className="cta-final__form" onSubmit={handleSubmit} noValidate>
                <h3 className="cta-form__title">{f.title}</h3>

                {error && <p className="form-error">{error}</p>}

                <div className="form-group">
                  <label>{f.fields.name} *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={f.fields.name}
                  />
                </div>

                <div className="form-group">
                  <label>{f.fields.email} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={f.fields.email}
                  />
                </div>

                <div className="form-group">
                  <label>{f.fields.city} *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={f.fields.city}
                  />
                </div>

                <div className="form-group">
                  <label>{f.fields.source}</label>
                  <select name="source" value={formData.source} onChange={handleChange}>
                    <option value="">{f.fields.source}</option>
                    {f.fields.sourceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn--lime btn--full btn--lg"
                  disabled={loading}
                >
                  {loading ? '...' : f.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
