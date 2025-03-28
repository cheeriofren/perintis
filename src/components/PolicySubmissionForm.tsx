import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PolicySubmission } from '@/types/policy';
import { HiDocumentAdd, HiExclamationCircle } from 'react-icons/hi';

interface PolicySubmissionFormProps {
  onSubmit: (data: PolicySubmission) => Promise<void>;
}

export default function PolicySubmissionForm({ onSubmit }: PolicySubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PolicySubmission>();

  const handleFormSubmit = async (data: PolicySubmission) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error submitting policy:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-6">
        <HiDocumentAdd className="w-6 h-6 text-primary-500" />
        <h2 className="text-xl font-semibold">Submit Kebijakan Baru</h2>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul Kebijakan</label>
          <input
            type="text"
            {...register('title', { required: 'Judul kebijakan wajib diisi' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instansi Pembuat</label>
          <input
            type="text"
            {...register('agency', { required: 'Instansi pembuat wajib diisi' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.agency && (
            <p className="mt-1 text-sm text-red-600">{errors.agency.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal Kebijakan</label>
          <input
            type="datetime-local"
            {...register('timestamp', { required: 'Tanggal kebijakan wajib diisi' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.timestamp && (
            <p className="mt-1 text-sm text-red-600">{errors.timestamp.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL Dokumen Resmi</label>
          <input
            type="url"
            {...register('officialDocument.url', { required: 'URL dokumen resmi wajib diisi' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.officialDocument?.url && (
            <p className="mt-1 text-sm text-red-600">{errors.officialDocument.url.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ringkasan Dampak</label>
          <textarea
            {...register('impactSummary', { required: 'Ringkasan dampak wajib diisi' })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {errors.impactSummary && (
            <p className="mt-1 text-sm text-red-600">{errors.impactSummary.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tag (pisahkan dengan koma)</label>
          <input
            type="text"
            {...register('tags')}
            placeholder="ekonomi, pendidikan, kesehatan"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Mengirim...' : 'Submit Kebijakan'}
          </button>
        </div>

        <div className="mt-4 flex items-start space-x-2 text-sm text-gray-500">
          <HiExclamationCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <p>
            Submission Anda akan diverifikasi oleh tim kami sebelum ditampilkan di timeline.
            Pastikan semua informasi akurat dan dapat diverifikasi.
          </p>
        </div>
      </form>
    </div>
  );
} 