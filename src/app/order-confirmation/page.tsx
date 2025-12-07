import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tack för din beställning!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Din beställning har mottagits och behandlas. Du kommer att få en bekräftelse via e-post inom kort.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Vad händer nu?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Vi behandlar din beställning inom 1-2 arbetsdagar</li>
                <li>• Du får ett e-postmeddelande när din order skickas</li>
                <li>• Spårningsinformation skickas till din e-post</li>
                <li>• Leverans tar normalt 2-5 arbetsdagar</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block"
              >
                Fortsätt handla
              </Link>
              
              <Link 
                href="/"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors inline-block"
              >
                Till startsidan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}