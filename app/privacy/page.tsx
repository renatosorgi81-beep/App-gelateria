import Header from '@/components/layout/Header';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Privacy Policy" showBack />
      <div className="px-4 py-6 max-w-prose mx-auto space-y-6 text-sm text-text-secondary">
        <h1 className="font-heading text-2xl font-bold text-text-primary">Informativa sulla Privacy</h1>
        <p className="text-xs text-text-secondary">Ultimo aggiornamento: {new Date().getFullYear()}</p>

        <section className="space-y-2">
          <h2 className="font-heading font-semibold text-text-primary">1. Titolare del trattamento</h2>
          <p>Vernaci [ragione sociale completa], con sede in [indirizzo], P.IVA [XXXXXXXX].</p>
          <p>Email: [email del titolare]</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-semibold text-text-primary">2. Dati raccolti</h2>
          <p>Raccogliamo i seguenti dati personali per la gestione degli ordini:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Nome e cognome</li>
            <li>Numero di telefono</li>
            <li>Indirizzo di consegna (opzionale, se si sceglie la consegna a domicilio)</li>
            <li>Contenuto dell&apos;ordine</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-semibold text-text-primary">3. Finalità del trattamento</h2>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Gestione ordine</strong> (base giuridica: esecuzione del contratto, art. 6 lett. b GDPR)</li>
            <li><strong>Comunicazioni promozionali via WhatsApp/SMS</strong> (base giuridica: consenso, art. 6 lett. a GDPR) — solo se hai prestato il consenso</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-semibold text-text-primary">4. Conservazione dei dati</h2>
          <p>I dati relativi agli ordini sono conservati per 5 anni ai fini fiscali e contabili. I dati per comunicazioni promozionali sono conservati fino alla revoca del consenso.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-semibold text-text-primary">5. I tuoi diritti</h2>
          <p>Ai sensi del GDPR hai diritto di accedere, rettificare, cancellare i tuoi dati, opporti al trattamento e portabilità dei dati. Per esercitare i tuoi diritti scrivi a: [email del titolare].</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-semibold text-text-primary">6. Cessione a terzi</h2>
          <p>I tuoi dati non vengono ceduti a terzi né trasferiti fuori dallo Spazio Economico Europeo.</p>
        </section>

        <p className="text-xs italic">Questa è un&apos;informativa generica. Fare riferimento al proprio consulente legale/privacy per la redazione definitiva conforme al caso specifico.</p>
      </div>
    </div>
  );
}
