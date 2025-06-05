/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Legal Information</h1>
      
      <div className="space-y-8">
        {/* D&D SRD Attribution */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">D&D 5e Content Attribution</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              This work includes material taken from the <strong>System Reference Document 5.1 ("SRD 5.1")</strong> by 
              Wizards of the Coast LLC and available at{' '}
              <a 
                href="https://dnd.wizards.com/resources/systems-reference-document" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                https://dnd.wizards.com/resources/systems-reference-document
              </a>.
            </p>
            <p>
              The SRD 5.1 is licensed under the{' '}
              <a 
                href="https://creativecommons.org/licenses/by/4.0/legalcode" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Creative Commons Attribution 4.0 International License
              </a>.
            </p>
            <p className="font-medium">
              Content includes: 396 spells, weapons, armor, equipment, and game mechanics from the official D&D 5e SRD.
            </p>
          </div>
        </section>

        {/* Open Game License */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Open Game License</h2>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-xs leading-relaxed">
            <p className="font-semibold mb-2">OPEN GAME LICENSE Version 1.0a</p>
            <p className="mb-2">
              The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc ("Wizards"). All Rights Reserved.
            </p>
            <p className="mb-2">
              1. Definitions: (a) "Contributors" means the copyright and/or trademark owners who have contributed Open Game Content; 
              (b) "Derivative Material" means copyrighted material including derivative works and translations (including into other computer languages), 
              potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work 
              may be recast, transformed or adapted; (c) "Distribute" means to reproduce, license, rent, lease, sell, broadcast, publicly display, 
              transmit or otherwise distribute...
            </p>
            <p className="text-center mt-4">
              <Link 
                href="https://www.wizards.com/default.asp?x=d20/oglfaq/20040123f" 
                target="_blank" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View Complete OGL License
              </Link>
            </p>
          </div>
        </section>

        {/* App License */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Application License</h2>
          <p className="text-sm leading-relaxed">
            This application (Dungeons & Databases) is licensed under the{' '}
            <a 
              href="https://opensource.org/licenses/MIT" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              MIT License
            </a>. 
            The application code is separate from the D&D content and may be used according to the MIT License terms.
          </p>
        </section>

        {/* Disclaimer */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <div className="text-sm leading-relaxed space-y-2">
            <p>
              <strong>Dungeons & Dragons</strong> and <strong>D&D</strong> are trademarks of Wizards of the Coast LLC 
              and are used here under the terms of the Open Game License and Creative Commons Attribution License.
            </p>
            <p>
              This application is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.
            </p>
            <p>
              All D&D content used is from the official System Reference Document and is used in accordance with the 
              Open Game License and Creative Commons Attribution 4.0 International License.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t text-center">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Back to App
        </Link>
      </div>
    </div>
  )
} 