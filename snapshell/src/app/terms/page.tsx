import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

function Page() {
  return (
    <MaxWidthWrapper className="py-24">
      <div className="mb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
            Terms and Conditions
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="font-semibold mb-4">Last updated: 18th June 2024</p>
        <div className="mb-8">
          <p className="font-semibold mb-2">1. Introduction</p>
          <p>
            Welcome to SnapShell ("Company", "we", "our", "us")! These Terms and Conditions
            ("Terms", "Terms and Conditions") govern your use of our web application located at
            [Your Web Application URL] (together or individually "Service") operated by SnapShell.
            <br />
            Your agreement to these Terms is required for accessing and using our Service. By
            accessing or using the Service, you agree to be bound by these Terms. If you disagree
            with any part of the terms, then you do not have permission to access the Service.
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">2. Communications</p>
          <p>
            By creating an Account on our Service, you agree to subscribe to newsletters, marketing
            or promotional materials, and other information we may send. However, you may opt out of
            receiving any, or all, of these communications from us by following the unsubscribe link
            or by emailing at BozinovskiDaniel@hotmail.com.
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">3. Purchases</p>
          <p>
            If you wish to purchase any product or service made available through the Service
            ("Purchase"), you may be asked to supply certain information relevant to your Purchase
            including, without limitation, your credit card number, the expiration date of your
            credit card, your billing address, and your shipping information.
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">4. Contests, Sweepstakes, and Promotions</p>
          <p>
            Any contests, sweepstakes, or other promotions (collectively, "Promotions") made
            available through the Service may be governed by rules that are separate from these
            Terms. If you participate in any Promotions, please review the applicable rules as well
            as our Privacy Policy.{' '}
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">5. Content</p>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain
            information, text, graphics, videos, or other material ("Content"). You are responsible
            for the Content that you post on or through the Service, including its legality,
            reliability, and appropriateness.
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">6. Accounts</p>
          <p>
            When you create an account with us, you guarantee that you are above the age of 18, and
            that the information you provide us is accurate, complete, and current at all times.
            Inaccurate, incomplete, or obsolete information may result in the immediate termination
            of your account on the Service.
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">7. Intellectual Property</p>
          <p>
            The Service and its original content (excluding Content provided by users), features,
            and functionality are and will remain the exclusive property of SnapShell and its
            licensors.
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">8. Termination</p>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately,
            without prior notice or liability, under our sole discretion, for any reason whatsoever
            and without limitation, including but not limited to a breach of the Terms.
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">9. Limitation of Liability</p>
          <p>
            In no event shall SnapShell, nor its directors, employees, partners, agents, suppliers,
            or affiliates, be liable for any indirect, incidental, special, consequential or
            punitive damages, including without limitation, loss of profits, data, use, goodwill, or
            other intangible losses, resulting from (i) your access to or use of or inability to
            access or use the Service; (ii) any conduct or content of any third party on the
            Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use
            or alteration of your transmissions or content, whether based on warranty, contract,
            tort (including negligence) or any other legal theory.
          </p>
        </div>
        <div className="mb-8">
          <p className="font-semibold mb-2">10. Governing Law</p>
          <p>
            These Terms shall be governed and construed in accordance with the laws of SnapShell,
            without regard to its conflict of law provisions.
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
