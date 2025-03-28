import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PolicySubmission, MediaCoverage } from '@/types/policy';

const policySchema = z.object({
  title: z.string().min(1, 'Judul kebijakan harus diisi'),
  agency: z.string().min(1, 'Instansi harus diisi'),
  documentUrl: z.string().url('URL dokumen tidak valid'),
  impactSummary: z.string().min(10, 'Ringkasan dampak harus minimal 10 karakter'),
  mediaCoverage: z.array(z.object({
    title: z.string().min(1, 'Judul artikel harus diisi'),
    url: z.string().url('URL artikel tidak valid'),
    type: z.enum(['local', 'international'])
  })).optional()
});

type PolicyFormData = z.infer<typeof policySchema>;

interface PolicyFormProps {
  onSubmit: (data: PolicySubmission) => Promise<void>;
  initialData?: Partial<PolicyFormData>;
  submitLabel?: string;
}

export default function PolicyForm({ onSubmit, initialData, submitLabel = 'Kirim Kebijakan' }: PolicyFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<PolicyFormData>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      ...initialData,
      mediaCoverage: initialData?.mediaCoverage || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'mediaCoverage'
  });

  const handleFormSubmit = async (data: PolicyFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error submitting policy:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="label">
          Judul Kebijakan
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="input-field"
        />
        {errors.title && (
          <p className="error-text">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="agency" className="label">
          Instansi
        </label>
        <input
          type="text"
          id="agency"
          {...register('agency')}
          className="input-field"
        />
        {errors.agency && (
          <p className="error-text">{errors.agency.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="documentUrl" className="label">
          URL Dokumen Resmi
        </label>
        <input
          type="url"
          id="documentUrl"
          {...register('documentUrl')}
          className="input-field"
        />
        {errors.documentUrl && (
          <p className="error-text">{errors.documentUrl.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="impactSummary" className="label">
          Ringkasan Dampak
        </label>
        <textarea
          id="impactSummary"
          rows={4}
          {...register('impactSummary')}
          className="input-field"
        />
        {errors.impactSummary && (
          <p className="error-text">{errors.impactSummary.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="label">Liputan Media (Opsional)</label>
          <button
            type="button"
            onClick={() => append({ title: '', url: '', type: 'local' })}
            className="btn-secondary"
          >
            Tambah Liputan
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Judul artikel"
                  {...register(`mediaCoverage.${index}.title`)}
                  className="input-field"
                />
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="URL artikel"
                  {...register(`mediaCoverage.${index}.url`)}
                  className="input-field"
                />
              </div>
              <div className="w-32">
                <select
                  {...register(`mediaCoverage.${index}.type`)}
                  className="input-field"
                >
                  <option value="local">Lokal</option>
                  <option value="international">Internasional</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn-secondary"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
} 