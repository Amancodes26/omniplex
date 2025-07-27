'use client';

import { useState } from 'react';
import styles from './pricing.module.css';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleUpgradeToPro = () => {
    setLoading(true);
    const checkoutUrl = process.env.NEXT_PUBLIC_STRIPE_PRO_CHECKOUT_URL;
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      alert('Checkout URL not configured');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upgrade to Omniplex Pro</h1>
        <p className={styles.subtitle}>
          Unlock unlimited searches and advanced AI features
        </p>
      </div>

      <div className={styles.plansGrid}>
        <div className={styles.planCard}>
          <div className={styles.planHeader}>
            <h3 className={styles.planName}>Free</h3>
            <div className={styles.planPrice}>$0<span>/month</span></div>
            <p className={styles.planDescription}>Perfect for getting started</p>
          </div>
          <ul className={styles.featuresList}>
            <li>✓ 10 searches per day</li>
            <li>✓ Basic AI responses</li>
            <li>✓ Standard support</li>
            <li>✓ Web search integration</li>
          </ul>
          <button className={styles.planButton} disabled>
            Current Plan
          </button>
        </div>

        <div className={`${styles.planCard} ${styles.popularPlan}`}>
          <div className={styles.popularBadge}>Most Popular</div>
          <div className={styles.planHeader}>
            <h3 className={styles.planName}>Pro</h3>
            <div className={styles.planPrice}>$10<span>/month</span></div>
            <p className={styles.planDescription}>For power users and professionals</p>
          </div>
          <ul className={styles.featuresList}>
            <li>✓ Unlimited searches</li>
            <li>✓ Advanced AI responses</li>
            <li>✓ Priority support</li>
            <li>✓ All integrations</li>
            <li>✓ Chat history export</li>
            <li>✓ Advanced analytics</li>
          </ul>
          <button 
            className={`${styles.planButton} ${styles.proPlanButton}`}
            onClick={handleUpgradeToPro}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Upgrade to Pro'}
          </button>
        </div>
      </div>

      <div className={styles.testInfo}>
        <h3>🧪 Test Mode</h3>
        <p>
          This is a test environment.
        </p>
      </div>
    </div>
  );
}
