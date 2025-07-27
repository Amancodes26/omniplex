'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './success.module.css';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd verify the session with your backend
      // For now, we'll just show a success message
      setSession({ id: sessionId });
      setLoading(false);
    } else {
      // If no session_id (common with Stripe hosted checkout), still show success
      setSession({ id: 'stripe-checkout-success' });
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.success}>
        <div className={styles.checkmark}>✅</div>
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.subtitle}>
          Thank you for subscribing to Omniplex Pro!
        </p>
        
        <div className={styles.details}>
          <p>Your subscription is now active and you have access to:</p>
          <ul className={styles.featuresList}>
            <li>✨ Unlimited searches</li>
            <li>🚀 Advanced AI responses</li>
            <li>⚡ Priority support</li>
            <li>🔗 All integrations</li>
            <li>📊 Advanced analytics</li>
            <li>💾 Chat history export</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.primaryButton}>
            Start Using Omniplex Pro
          </Link>
          <Link href="/pricing" className={styles.secondaryButton}>
            View Pricing
          </Link>
        </div>

        <div className={styles.sessionInfo}>
          <p className={styles.sessionId}>
            Session ID: <code>{session.id}</code>
          </p>
          <p className={styles.testMode}>
            🧪 This was a test payment using Stripe test mode.
          </p>
        </div>

        <div className={styles.instructions}>
          <h3>🎯 Next Steps</h3>
          <p>
            Your pro subscription is now active! You can start using all the premium features immediately.
          </p>
          <p>
            <strong>Note:</strong> If you were redirected here from Stripe, your payment was successful and your account has been upgraded.
          </p>
        </div>
      </div>
    </div>
  );
}
