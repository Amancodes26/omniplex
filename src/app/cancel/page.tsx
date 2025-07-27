'use client';

import Link from 'next/link';
import styles from './cancel.module.css';

export default function CancelPage() {
  return (
    <div className={styles.container}>
      <div className={styles.cancel}>
        <div className={styles.icon}>❌</div>
        <h1 className={styles.title}>Payment Cancelled</h1>
        <p className={styles.subtitle}>
          No worries! You can try again anytime.
        </p>
        
        <div className={styles.details}>
          <p>Your payment was cancelled and no charges were made.</p>
          <p>If you experienced any issues, please contact support.</p>
        </div>

        <div className={styles.actions}>
          <Link href="/pricing" className={styles.primaryButton}>
            Try Again
          </Link>
          <Link href="/" className={styles.secondaryButton}>
            Back to Home
          </Link>
        </div>

        <div className={styles.help}>
          <p className={styles.helpText}>
            Need help? Contact us at support@omniplex.ai
          </p>
        </div>
      </div>
    </div>
  );
}
