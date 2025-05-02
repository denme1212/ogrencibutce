import React from 'react';
import { Download } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useBudget } from '../context/BudgetContext';
import { formatCurrency, calculateTotalIncome, calculateTotalExpenses, calculateBalance } from '../utils/budgetUtils';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5,
  },
  text: {
    fontSize: 12,
  },
  total: {
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
});

const BudgetPDF: React.FC = () => {
  const { state } = useBudget();
  const { budget, currentMonth } = state;

  const BudgetDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Aylık Bütçe Raporu</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gelirler</Text>
          {budget.income.map((item) => (
            <View style={styles.row} key={item.id}>
              <Text style={styles.text}>{item.description}</Text>
              <Text style={styles.text}>{formatCurrency(item.amount)}</Text>
            </View>
          ))}
          <View style={styles.total}>
            <Text style={styles.text}>Toplam Gelir: {formatCurrency(calculateTotalIncome(budget))}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giderler</Text>
          {budget.expenses.map((item) => (
            <View style={styles.row} key={item.id}>
              <Text style={styles.text}>{item.description}</Text>
              <Text style={styles.text}>{formatCurrency(item.amount)}</Text>
            </View>
          ))}
          <View style={styles.total}>
            <Text style={styles.text}>Toplam Gider: {formatCurrency(calculateTotalExpenses(budget))}</Text>
          </View>
        </View>

        <View style={styles.total}>
          <Text style={styles.text}>Kalan Bakiye: {formatCurrency(calculateBalance(budget))}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="flex justify-end mb-4">
      <PDFDownloadLink
        document={<BudgetDocument />}
        fileName={`butce-raporu-${currentMonth}.pdf`}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        {({ loading }) => (
          <>
            <Download className="h-4 w-4 mr-2" />
            {loading ? 'Hazırlanıyor...' : 'PDF İndir'}
          </>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default BudgetPDF;