import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { IdentifyBugResponse } from '../types/bug.types';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface BugResultCardProps {
  result: IdentifyBugResponse;
}

export const BugResultCard: React.FC<BugResultCardProps> = ({ result }) => {
  const { data, status, message, process_time_seconds } = result;

  if (!data) return null;

  const openReference = () => {
    if (data.reference_url) {
      Linking.openURL(data.reference_url);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {status === 'success' ? 'Teridentifikasi' : 'Identifikasi Parsial'}
          </Text>
        </View>
        {process_time_seconds !== undefined && (
          <Text style={styles.timeText}>{process_time_seconds.toFixed(2)} dtk</Text>
        )}
      </View>

      <Text style={styles.speciesTitle}>{data.species_name}</Text>

      {message && <Text style={styles.warningMessage}>{message}</Text>}

      {data.taxonomy ? (
        <View style={styles.taxonomyContainer}>
          <Text style={styles.sectionTitle}>Data Taksonomi</Text>
          <View style={styles.taxonomyRow}>
            <Text style={styles.taxonomyLabel}>Order</Text>
            <Text style={styles.taxonomyValue}>{data.taxonomy.order || '-'}</Text>
          </View>
          <View style={styles.taxonomyRow}>
            <Text style={styles.taxonomyLabel}>Family</Text>
            <Text style={styles.taxonomyValue}>{data.taxonomy.family || '-'}</Text>
          </View>
          <View style={styles.taxonomyRow}>
            <Text style={styles.taxonomyLabel}>Genus</Text>
            <Text style={styles.taxonomyValue}>{data.taxonomy.genus || '-'}</Text>
          </View>
          <View style={styles.taxonomyRow}>
            <Text style={styles.taxonomyLabel}>Species</Text>
            <Text style={[styles.taxonomyValue, styles.italicText]}>
              {data.taxonomy.species || '-'}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noTaxonomyText}>
          Detail taksonomi belum tersedia di database referensi.
        </Text>
      )}

      {data.reference_url && (
        <TouchableOpacity style={styles.linkButton} onPress={openReference}>
          <Text style={styles.linkButtonText}>Buka Referensi BugGuide</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  badge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  badgeText: {
    color: COLORS.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  timeText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  speciesTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  warningMessage: {
    backgroundColor: COLORS.warningBg,
    color: COLORS.warning,
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
    fontSize: 13,
    marginBottom: SPACING.sm,
  },
  taxonomyContainer: {
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  taxonomyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  taxonomyLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  taxonomyValue: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  italicText: {
    fontStyle: 'italic',
  },
  noTaxonomyText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: SPACING.xs,
  },
  linkButton: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});

