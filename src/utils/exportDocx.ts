import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle } from
'docx';
import { buildClauses, keyTerms, partiesLine } from './agreement';
import type { AgreementState } from '../types/sar';

function noBorder() {
  return {
    top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
  };
}

export async function buildAgreementDocx(state: AgreementState): Promise<Blob> {
  const parties = partiesLine(state);
  const terms = keyTerms(state);
  const clauses = buildClauses(state);

  const termsTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: terms.map(
      (term) =>
      new TableRow({
        children: [
        new TableCell({
          width: { size: 38, type: WidthType.PERCENTAGE },
          borders: noBorder(),
          margins: { top: 100, bottom: 100 },
          children: [
          new Paragraph({
            children: [
            new TextRun({ text: term.label.toUpperCase(), bold: true, size: 16, color: '666666' })]

          })]

        }),
        new TableCell({
          width: { size: 62, type: WidthType.PERCENTAGE },
          borders: noBorder(),
          margins: { top: 100, bottom: 100 },
          children: [
          new Paragraph({
            children: [new TextRun({ text: term.value, size: 21 })]
          })]

        })]

      })
    )
  });

  const clauseParagraphs = clauses.flatMap((clause) => [
  new Paragraph({
    spacing: { before: 240, after: 60 },
    children: [
    new TextRun({ text: `${clause.number}. ${clause.title}`, bold: true, size: 21 })]

  }),
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: clause.body, size: 20 })]
  })]
  );

  const doc = new Document({
    sections: [
    {
      properties: {},
      children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.TITLE,
        children: [
        new TextRun({
          text: 'STOCK APPRECIATION RIGHTS AGREEMENT',
          bold: true,
          size: 28
        })]

      }),
      new Paragraph({ spacing: { after: 240 }, text: '' }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
        new TextRun({ text: `This Stock Appreciation Rights Agreement is entered into on ` }),
        new TextRun({ text: parties.date, bold: true }),
        new TextRun({ text: ' between ' }),
        new TextRun({ text: parties.company, bold: true }),
        ...(parties.cin ? [new TextRun({ text: `, CIN ${parties.cin}` })] : []),
        new TextRun({ text: `, having its registered office at ${parties.office} (the "Company") and ` }),
        new TextRun({ text: parties.grantee, bold: true }),
        new TextRun({ text: `, ${parties.role} (the "Grantee").` })]

      }),
      termsTable,
      new Paragraph({ spacing: { after: 120 }, text: '' }),
      ...clauseParagraphs,
      new Paragraph({ spacing: { before: 400 }, text: '' }),
      new Paragraph({
        spacing: { before: 200 },
        children: [new TextRun({ text: `For ${parties.company}` , bold: true })]
      }),
      new Paragraph({ text: 'Authorised signatory' }),
      new Paragraph({ spacing: { before: 300 }, children: [new TextRun({ text: parties.grantee, bold: true })] }),
      new Paragraph({ text: 'Grantee' })]

    }]

  });

  return Packer.toBlob(doc);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function agreementFilename(state: AgreementState, ext: string) {
  const parties = partiesLine(state);
  const safe = parties.grantee.replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '') || 'agreement';
  return `SAR-Agreement-${safe}.${ext}`;
}
