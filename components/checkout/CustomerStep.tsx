'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { CustomerData } from '@/types';

const schema = z.object({
  name: z.string().min(2, 'Inserisci il tuo nome'),
  surname: z.string().min(2, 'Inserisci il tuo cognome'),
  phone: z.string().min(9, 'Numero di telefono non valido').regex(/^[\d\s+\-()]+$/, 'Formato non valido'),
  address: z.string().optional(),
  city: z.string().optional(),
});

interface CustomerStepProps {
  defaultValues?: Partial<CustomerData>;
  onSubmit: (data: CustomerData) => void;
}

export default function CustomerStep({ defaultValues, onSubmit }: CustomerStepProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="card p-4 space-y-4">
        <h2 className="font-heading font-bold text-text-primary">Dati personali</h2>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Nome"
            required
            placeholder="Mario"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Cognome"
            required
            placeholder="Rossi"
            error={errors.surname?.message}
            {...register('surname')}
          />
        </div>
        <Input
          label="Telefono"
          required
          type="tel"
          placeholder="+39 320 000 0000"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <div className="card p-4 space-y-4">
        <h2 className="font-heading font-bold text-text-primary">Indirizzo di consegna</h2>
        <p className="text-xs text-text-secondary">Obbligatorio solo per la consegna a domicilio</p>
        <Input
          label="Via e Civico"
          placeholder="Via Roma 1"
          error={errors.address?.message}
          {...register('address')}
        />
        <Input
          label="Comune"
          placeholder="Palermo"
          error={errors.city?.message}
          {...register('city')}
        />
      </div>

      <Button type="submit" variant="primary" fullWidth>
        Avanti →
      </Button>
    </form>
  );
}
