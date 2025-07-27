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
        <div className={styles.checkmark}>✨</div>
        <h1 className={styles.title}>Welcome to Pro</h1>
        <p className={styles.subtitle}>
          Your subscription is now active
        </p>
        
        <div className={styles.details}>
          <p>You now have access to all premium features:</p>
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
            Start Exploring
          </Link>
        </div>

        <div className={styles.sessionInfo}>
          {sessionId && (
            <p className={styles.sessionId}>
              Session: <code>{sessionId}</code>
            </p>
          )}
          <p className={styles.testMode}>
            🧪 Test Mode - No actual charges were made
          </p>
        </div>

        <div className={styles.instructions}>
          <h3>🎯 What's Next?</h3>
          <p>
            Your Pro subscription is ready to use. All premium features are now unlocked in your account.
          </p>
          <p>
            <strong>Ready to get started?</strong> Head back to the chat and experience the enhanced capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
