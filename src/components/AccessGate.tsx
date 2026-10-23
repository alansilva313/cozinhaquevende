import { useState, type FormEvent } from 'react';
import { ArrowRight, CookingPot, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { checkLocalAccess, createLocalAccess, type LocalAccessProfile } from '../lib/access';

type Props = {
  profile: LocalAccessProfile | null;
  onUnlocked: (profile: LocalAccessProfile) => void;
};

export function AccessGate({ profile, onUnlocked }: Props) {
  const [username, setUsername] = useState(profile?.username ?? '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.trim() || !password) return;
    setBusy(true);
    setError('');
    try {
      if (profile) {
        const valid = await checkLocalAccess(username, password, profile);
        if (!valid) {
          setError('Usuário ou senha não conferem com o acesso salvo neste navegador.');
          return;
        }
        onUnlocked(profile);
      } else {
        const newProfile = await createLocalAccess(username, password);
        onUnlocked(newProfile);
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Não foi possível ativar o acesso neste navegador.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="access-screen">
      <section className="access-card" aria-labelledby="access-title">
        <Link to="/oferta" className="access-brand"><span><CookingPot size={21}/></span> Cozinha <em>que Rende</em></Link>
        <div className="access-icon"><LockKeyhole size={22}/></div>
        <p className="eyebrow">ACESSO À BIBLIOTECA</p>
        <h1 id="access-title">{profile ? 'Entre para continuar' : 'Ative seu primeiro acesso'}</h1>
        <p className="access-description">{profile ? 'Digite as credenciais que você cadastrou neste navegador.' : 'Digite o usuário e a senha que recebeu. Vamos criar seu acesso neste navegador para você continuar de onde parou.'}</p>
        <form className="access-form" onSubmit={submit}>
          <label htmlFor="access-username">Usuário</label>
          <input id="access-username" name="username" autoComplete="username" autoCapitalize="none" value={username} onChange={(event) => setUsername(event.target.value)} required />
          <label htmlFor="access-password">Senha</label>
          <input id="access-password" name="password" type="password" autoComplete={profile ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error && <p className="access-error" role="alert">{error}</p>}
          <button className="access-submit" type="submit" disabled={busy}>{busy ? 'Preparando acesso…' : profile ? 'Entrar na biblioteca' : 'Ativar neste navegador'} <ArrowRight size={17}/></button>
        </form>
        <p className="access-local-note"><ShieldCheck size={17}/> A senha não é enviada a um servidor. A ativação fica salva neste navegador.</p>
        <Link to="/oferta" className="access-offer-link">Ainda não conhece o conteúdo? Veja a apresentação</Link>
      </section>
    </main>
  );
}
