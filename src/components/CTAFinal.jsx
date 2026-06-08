import { useContext, useState } from 'react';
import { LangContext } from '../App';
import content from '../i18n/content';
import useScrollAnim from '../hooks/useScrollAnim';

function StudentForm({ t }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', city: '', status: '', career: '', source: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success__icon">✓</div>
        <p>{t.success}</p>
      </div>
    );
  }

  return (
    <form className="cta-form" onSubmit={handleSubmit} noValidate>
      <h3 className="cta-form__title">{t.title}</h3>

      <div className="form-group">
        <label>{t.fields.name} *</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder={t.fields.name}
        />
      </div>

      <div className="form-group">
        <label>{t.fields.email} *</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder={t.fields.email}
        />
      </div>

      <div className="form-group">
        <label>{t.fields.city} *</label>
        <input
          type="text"
          name="city"
          required
          value={formData.city}
          onChange={handleChange}
          placeholder={t.fields.city}
        />
      </div>

      <div className="form-group">
        <label>{t.fields.status} *</label>
        <select name="status" required value={formData.status} onChange={handleChange}>
          <option value="">{t.fields.status}</option>
          {t.fields.statusOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>{t.fields.career}</label>
        <input
          type="text"
          name="career"
          value={formData.career}
          onChange={handleChange}
          placeholder={t.fields.career}
        />
      </div>

      <div className="form-group">
        <label>{t.fields.source}</label>
        <select name="source" value={formData.source} onChange={handleChange}>
          <option value="">{t.fields.source}</option>
          {t.fields.sourceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn--lime btn--full btn--lg">
        {t.submit}
      </button>
    </form>
  );
}

function CompanyForm({ t }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', size: '', need: '', message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <div className="form-success__icon">✓</div>
        <p>{t.success}</p>
      </div>
    );
  }

  return (
    <form className="cta-form" onSubmit={handleSubmit} noValidate>
      <h3 className="cta-form__title">{t.title}</h3>

      <div className="form-group">
        <label>{t.fields.name} *</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder={t.fields.name}
        />
      </div>

      <div className="form-group">
        <label>{t.fields.email} *</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder={t.fields.email}
        />
      </div>

      <div className="form-group">
        <label>{t.fields.company} *</label>
        <input
          type="text"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          placeholder={t.fields.company}
        />
      </div>

      <div className="form-group">
        <label>{t.fields.size}</label>
        <select name="size" value={formData.size} onChange={handleChange}>
          <option value="">{t.fields.size}</option>
          {t.fields.sizeOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>{t.fields.need}</label>
        <select name="need" value={formData.need} onChange={handleChange}>
          <option value="">{t.fields.need}</option>
          {t.fields.needOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>{t.fields.message}</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder={t.fields.message}
        />
      </div>

      <button type="submit" className="btn btn--lime btn--full btn--lg">
        {t.submit}
      </button>
    </form>
  );
}

export default function CTAFinal() {
  const { lang } = useContext(LangContext);
  const t = content[lang].ctaFinal;
  const ref = useScrollAnim();
  const [activeTab, setActiveTab] = useState('student');

  return (
    <section id="registro" className="cta-final section--dark" ref={ref}>
      <div className="container">
        <div className="cta-final__text anim-ready" style={{ '--delay': '0s' }}>
          <blockquote className="cta-final__quote">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <p className="cta-final__tagline">{t.tagline}</p>
        </div>

        <div className="cta-final__form-wrap anim-ready" style={{ '--delay': '0.2s' }}>
          <div className="cta-tabs">
            <button
              className={`cta-tab${activeTab === 'student' ? ' cta-tab--active' : ''}`}
              onClick={() => setActiveTab('student')}
            >
              {t.tabs.student}
            </button>
            <button
              className={`cta-tab${activeTab === 'company' ? ' cta-tab--active' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              {t.tabs.company}
            </button>
          </div>

          <div className="cta-final__form">
            {activeTab === 'student' ? (
              <StudentForm t={t.studentForm} />
            ) : (
              <CompanyForm t={t.companyForm} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
